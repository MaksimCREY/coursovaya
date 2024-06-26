const express = require('express');
const router = express.Router();
const Student = require('./student');

// Получение списка всех студентов
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Добавление нового студента
router.post('/', async (req, res) => {
    const student = new Student({
        fullName: req.body.fullName,
        course: req.body.course,
        group: req.body.group,
        status: req.body.status,
        address: req.body.address
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});





router.delete('/:id', async (req, res) => {
    try {
        const result = await Student.findOneAndDelete({ _id: req.params.id });
        if (!result) {
            return res.status(404).json({ message: 'Студент не найден' });
        }
        res.json({ message: 'Студент удален' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { fullNameUpdate, courseUpdate, groupUpdate, statusUpdate, addressUpdate } = req.body;

        // Создаем объект с полями, которые мы хотим обновить
        const updateFields = {};
        if (fullNameUpdate) updateFields.fullName = fullNameUpdate;
        if (courseUpdate) updateFields.course = courseUpdate;
        if (groupUpdate) updateFields.group = groupUpdate;
        if (statusUpdate) updateFields.status = statusUpdate;
        if (addressUpdate) updateFields.address = addressUpdate;

        // Ищем студента по ID и обновляем его данные
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, updateFields, { new: true });
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
