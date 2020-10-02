const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Project = require('../models/project');
const Task = require('../models/task');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {

      const project = await Project.find().populate(['tasks']);

      return res.send({ project })

    } catch (err) {
      return res.status(400).send({ error: 'Erro em carregar os projetos'})
    }
});

router.get('/:projectId', async (req, res) => {
  try {

    const project = await Project.findById(req.params.projectId).populate(['tasks']);

    return res.send({ project })

  } catch (err) {
    return res.status(400).send({ error: 'Erro em carrega o projeto'})
  }
});


router.post('/', async (req, res) => {
    try {

      const { title, about, tasks, team, endedAt, token} = req.query
      if (token === undefined || token === '' || title === undefined || about === undefined){
        title, about, tasks, team, endedAt, token = req.body
      }
      console.log(req.query)

      const project = await Project.create({ title, about, responsible: req.userId, team, endedAt})
        
      await project.save()
              return res.send({ project })

    } catch (err) {
      console.log('teste7') 
        return res.status(400).send({ error: 'Erro em criar novo projeto'})
    }
});

router.put('/:projectId', async (req, res) => {
  try {
        
    const { title, about, tasks, team, endedAt, token} = req.query
      if (token === undefined || token === '' || title === undefined || about === undefined){
        title, about, tasks, team, endedAt, token = req.body
      }

    const project = await Project.findByIdAndUpdate(req.params.projectId,
      {title, 
        about, 
        tasks, 
        team, 
        endedAt}, { new: true })
   
    project.tasks = []

    await Task.remove({ project : project._id })

    await Promise.all(tasks.map(async task =>{
        const projectTask = new Task({...task, project: project._id })
        
        await projectTask.save()
        
        project.tasks.push(projectTask) 
             
    }))
    
    await project.save()
            return res.send({ project })

} catch (err) {
    return res.status(400).send({ error: 'Erro em atualizar o projeto'})
}
});

router.delete('/:projectId', async (req, res) => {
    try {
      if(req.params.projectId){
      await Project.findByIdAndDelete(req.params.projectId);
      }
      else{
        await Project.findByIdAndDelete(req.query.projectId);
      }
  
      return res.send({ })
  
    } catch (err) {
        return res.status(400).send({ error: 'Erro em deletar o projeto'})
    }  
});

module.exports = app => app.use('/projects', router);
