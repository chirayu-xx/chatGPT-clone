import admin from 'firebase-admin'
import query from '@/lib/queryApi';
import type {NextApiRequest, NextApiResponse} from 'next' 
import { adminDb } from '@/firebaseAdmin';

type Data ={
    answer: string
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
){
    const {prompt, chatId, model ,session} = req.body;
    if(!prompt){
        res.status(400).json({answer: "Please provide a prompt."});
    }
    if(!chatId){
        res.status(400).json({answer: "Please provide a valid chat ID."});
    }

    // ChatGPT query 
    const response = await query(prompt, chatId, model)

    const message : Message = {
        text: response || "ChatGPT was unable to find",
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id:'ChatGPT',
            name:'ChatGPT',
            avatar:"https://github.com/chirayu-xx/Bro-AI/blob/main/client/assets/robot.png?raw=true",
        },
    }
    await adminDb
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message)

    res.status(200).json({answer: message.text})
}