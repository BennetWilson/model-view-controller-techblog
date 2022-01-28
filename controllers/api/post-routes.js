const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req,res) => {
    try {
        const postData = await Post.findAll({
          include: [User],
        });
    
        const posts = postData.map((post) => post.get({ plain: true }));
    
        res.json(posts);
      } catch (err) {
        res.status(500).json(err);
      }
})

router.get('/:id', async (req,res) => {
    try {
        const postData = await Post.findByPk({
            where: {
                id: req.params.id
            },
          include: [User],
        });
    
        const posts = postData.map((post) => post.get({ plain: true }));
    
        res.json(posts);
      } catch (err) {
        res.status(500).json(err);
      }
})

router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    console.log(body)
    // try{
        const newPost = await Post.create({...body, user_id: req.session.user_id});
        console.log(`Here is your new post:  ${newPost}`);
        res.json(newPost)
    // } catch (err) {
    //     console.log('Post Failed', err);
    // res.status(500).json(err);
    // }
});

router.put('/:id', withAuth, async (req, res) => {
    // try{
        console.log(`Here is the req.body ${req.body}`);
        const [affectedRows] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if(affectedRows > 0) {
            res.status(200).json(affectedRows);
        } else {
            res.status(400).end();
        }
    // } catch (err) {
    //     res.status(500).json(err);
    // }
});

router.delete('/:id', withAuth, async (req, res) =>{
    // try {
        const affectedRows  = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.json(affectedRows)
        // if(affectedRows > 0) {
        //     res.status(200).json(affectedRows);
        // } else {
        //     res.status(
        // }
    // } catch (err) {
    //     res.status(500).json(err)
    // }
});

module.exports = router