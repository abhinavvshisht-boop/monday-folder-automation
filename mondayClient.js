const axios = require("axios");

const API_URL = "https://api.monday.com/v2";
const TOKEN = process.env.MONDAY_TOKEN;

async function query(query) {
  return axios.post(
    API_URL,
    { query },
    {
      headers: {
        Authorization: TOKEN,
        "Content-Type": "application/json",
      },
    }
  );
}

module.exports = {
  createFolder: async (workspaceId, name) => {
    const q = `
      mutation {
        create_folder(workspace_id: ${workspaceId}, name: "${name}") {
          id
        }
      }
    `;
    const res = await query(q);
    return res.data.data.create_folder.id;
  },

  getBoardsFromFolder: async (folderId) => {
    const q = `
      query {
        folders(ids: "${folderId}") {
          children {
            id
            type
          }
        }
      }
    `;
    const res = await query(q);
    return res.data.data.folders[0].children.filter(
      c => c.type === "board"
    );
  },

  duplicateBoard: async (boardId, folderId) => {
    const q = `
      mutation {
        duplicate_board(
          board_id: ${boardId},
          duplicate_type: duplicate_board_with_structure,
          folder_id: "${folderId}"
        ) {
          board { id }
        }
      }
    `;
    await query(q);
  },

  markFolderCreated: async (boardId, itemId) => {
    const q = `
      mutation {
        change_simple_column_value(
          board_id: ${boardId},
          item_id: ${itemId},
          column_id: "boolean_mkzjpbme",
          value: "Yes"
        )
      }
    `;
    await query(q);
  }
};
