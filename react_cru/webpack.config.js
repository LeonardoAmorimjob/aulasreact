const {resolve}=require('path');
module.exports={
    entry:resolve(__dirname,'src','Index.js'),
    output:{
        path: resolve(__dirname,'public'),
        filename:'bundle.js'
    },
    devServer:{
        contentBase: resolve(__dirname,'public')
    },
    module:{
        rules:
        [
            {
                test:/\.css$/,
                use:
                [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                ]
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader: 'babel-loader'
                }
             },
             {
                test:/.*\.(gif|png|jpe?g)$/i,
                use:{
                    loader: 'file-loader'
                }
             }
        ]
    }
   
}