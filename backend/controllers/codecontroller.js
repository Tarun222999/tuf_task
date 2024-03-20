import mySqlPool from "../config/db.js"

const PAGE_SIZE = 4;
export const listCodes = async (req, res) => {
    try {
       
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const offset = (page - 1) * PAGE_SIZE;
        const data = await mySqlPool.query(`SELECT * FROM codestore LIMIT ?, ?`, [offset, PAGE_SIZE]);
        if (!data || data.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'No Records Found'
            });
        }

        
        return res.status(200).send({
            success: true,
            data: data[0],
            message: "Codes fetched successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Server error'
        });
    }
};


export const createcodes=async (req,res)=>{
    try {

    const { username, codeLanguage, standardInput, sourceCode } = req.body;
    
    if(!username || !codeLanguage || !sourceCode){
        return res.status(400).send({
            success:false,
            message:"username,codelanguage,sourcecode required"
        })
    }   
    let data
    if(standardInput){
         data=await mySqlPool.query('INSERT INTO codestore (username, code_language, standard_input, source_code) VALUES (?, ?, ?, ?)',[username, codeLanguage, standardInput, sourceCode ])
    }else{
        data=await mySqlPool.query('INSERT INTO codestore (username, code_language,  source_code) VALUES (?, ?, ?)',[username, codeLanguage, sourceCode ])
    }
    if(!data){
        return res.status(400).send({
            success:false,
            message:'Insert Code Failed'
        })
    }

    redisCache.del("/api/v1/code/listcodes", (err) => {
        if (err) throw err;
    });

    return res.status(200).send({
        success:true,
        data:data,
        message:"Code submited succesfully"
    })

} catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:'Server error'
    })
}
    
}