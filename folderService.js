const { query } = require("./mondayClient");
const { WORKSPACE_ID } = require("./config");

async function createProjectFolder(event) {
  console.log("📁 createProjectFolder STARTED");
  console.log("Item ID:", event.itemId);
  console.log("Workspace ID:", WORKSPACE_ID);

  const mutation = `
    mutation CreateFolder($workspaceId: ID!, $name: String!) {
      create_folder(workspace_id: 18407122201, name: $name) {
        id
        name
      }
    }
  `;

  try {
    const result = await query(mutation, {
      workspaceId: WORKSPACE_ID,
      name: `Project-${event.itemId}`,
    });

    console.log("🎉 Folder created:", JSON.stringify(result, null, 2));
    return result;
  } catch (err) {
    console.error("💥 Folder creation FAILED");
    throw err;
  }
}

module.exports = { createProjectFolder };
