const fs = require('fs');

module.exports = {
  createData: async (data, newItem, callback) => {
    fs.readFile(data, 'utf8', (err, data) => {
      if (err) {
        console.error('Error to read file:', err);
        return;
      }
    });

    const jsonData = JSON.parse(data);

    jsonData.push(newItem);
    const newData = JSON.stringify(jsonData, null, 2);

    fs.writeFile(data, newData, 'utf8', (err) => {
      if (err) {
        console.error('Error al escribir en el archivo:', err);
        return;
      }
      console.log('Added new item.');
    });
  },

  updateData: async (data, itemId, newData, propertyCompare, callback) => {
    readData((err, data) => {
      if (err) {
        return callback(err);
      }
      const itemToUpdateIndex = data.findIndex(
        (item) => item[propertyCompare] === itemId
      );
      if (itemToUpdateIndex === -1) {
        return callback(new Error('Item not found'));
      }
      data[itemToUpdateIndex] = { ...data[itemToUpdateIndex], ...newData };
      fs.writeFile(filePath, JSON.stringify(data, null, 2), callback);
    });
  },

  deleteData: async (data, itemId, propertyCompare, callback) => {
    readData((err, data) => {
      if (err) {
        return callback(err);
      }
      const newData = data.filter((item) => item[propertyCompare] !== itemId);
      fs.writeFile(filePath, JSON.stringify(newData, null, 2), callback);
    });
  },
};
