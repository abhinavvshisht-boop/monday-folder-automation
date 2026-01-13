const monday = require("./mondayClient");
const config = require("./config");

async function createProjectFolder(event) {
  const { boardId, itemId } = event;

  // 1. Create folder
  const folderId = await monday.createFolder(
    config.WORKSPACE_ID,
    `Project - ${itemId}`
  );

  // 2. Get template boards
  const boards = await monday.getBoardsFromFolder(
    config.TEMPLATE_FOLDER_ID
  );

  // 3. Duplicate boards
  for (const board of boards) {
    await monday.duplicateBoard(board.id, folderId);
  }

  // 4. Mark item as processed
  await monday.markFolderCreated(boardId, itemId);
}

module.exports = { createProjectFolder };
