// ref: https://www.sanity.io/docs/migrating-data
/** @type {import('@sanity/client').ClientConstructor} */
const sanityClient = require("@sanity/client");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-02-02",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const fetchDocuments = () => {
  return client.fetch(`*[_type == "randomImage" && defined(image.loading)]`);
};

const buildPatches = (docs) => {
  return docs.map((doc) => ({
    id: doc._id,
    patch: {
      unset: ["image.loading"],
      // this will cause the transaction to fail if the documents has been
      // modified since it was fetched.
      ifRevisionID: doc._rev,
    },
  }));
};

const createTransaction = (patches) => {
  return patches.reduce(
    (tx, patch) => tx.patch(patch.id, patch.patch),
    client.transaction()
  );
};

const commitTransaction = (tx) => tx.commit();

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  const patches = buildPatches(documents);
  if (patches.length === 0) {
    console.log("No more documents to migrate!");
    return null;
  }
  console.log(
    `Migrating batch:\n %s`,
    patches
      .map((patch) => `${patch.id} => ${JSON.stringify(patch.patch)}`)
      .join("\n")
  );
  const transaction = createTransaction(patches);
  await commitTransaction(transaction);
  return migrateNextBatch();
};

migrateNextBatch().catch((err) => {
  console.error(err);
  process.exit(1);
});
