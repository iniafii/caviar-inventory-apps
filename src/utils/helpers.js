const handleDatabaseError = (res, error) => {
    console.error(error);
    res.status(500).json({ error: 'Database Error: ' + error.message });
};

const createRecord = async (res, db, table, data) => {
    try {
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(() => '?').join(', ');
        const values = Object.values(data);

        const [result] = await db.query(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`, values);
        res.status(201).json({ message: `${table.slice(0, -1)} added successfully`, id: result.insertId, ...data });
    } catch (error) {
        handleDatabaseError(res, error);
    }
};

const getAllRecords = async (res, db, table) => {
    try {
        const [records] = await db.query(`SELECT * FROM ${table}`);
        res.status(200).json(records);
    } catch (error) {
        handleDatabaseError(res, error);
    }
};

const updateRecord = async (res, db, table, id, data) => {
    try {
        const fields = Object.keys(data).map(field => `${field} = ?`).join(', ');
        const values = Object.values(data);
        values.push(id);

        const [result] = await db.query(`UPDATE ${table} SET ${fields} WHERE id = ?`, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `${table.slice(0, -1)} not found` });
        }
        res.status(200).json({ message: `${table.slice(0, -1)} updated successfully`, ...data });
    } catch (error) {
        handleDatabaseError(res, error);
    }
};

const deleteRecord = async (res, db, table, id) => {
    try {
        const [result] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `${table.slice(0, -1)} not found` });
        }
        res.status(200).json({ message: `${table.slice(0, -1)} deleted successfully` });
    } catch (error) {
        handleDatabaseError(res, error);
    }
};

module.exports = {
    handleDatabaseError,
    createRecord,
    getAllRecords,
    updateRecord,
    deleteRecord
};
