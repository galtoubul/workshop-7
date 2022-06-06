const fs = require("fs").promises;
const jediFile = "jedi_list.json";

async function replaceJedi(jediId, jedi) {
  const oldJedi = await getJedi(jediId);
  await deleteJedi(jediId);
  const updatedJedi = { ...oldJedi, ...jedi };
  await addJedi(updatedJedi);
}

async function deleteJedi(id) {
  const data = await readJediFile();
  const newData = data.filter((jedi) => jedi.id !== id);
  await writeJediFile(newData);
}

async function getAll() {
  const data = await readJediFile();
  return data;
}

async function addJedi(jedi) {
  let data = await readJediFile();
  if (!data) {
    data = [];
  }
  data.push(jedi);
  await writeJediFile(data);
}

async function getJedi(id) {
  const data = await readJediFile();
  return data.find((value) => value.id === id);
}

async function getJediByName(name) {
  const data = await readJediFile();
  return data.find((value) => value.name === name);
}

async function readJediFile() {
  try {
    const data = await fs.readFile(jediFile);
    console.log(data.toString());
    return JSON.parse(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

async function writeJediFile(content) {
  try {
    await fs.writeFile(jediFile, JSON.stringify(content));
  } catch (error) {
    console.error(`Failed to write to file ${error.message}`);
  }
}

module.exports = {
  addJedi,
  getJedi,
  getAll,
  replaceJedi,
  deleteJedi,
};
