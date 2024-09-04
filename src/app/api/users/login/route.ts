import { connect } from "@/database/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const {email, password} = reqBody

        console.log(reqBody);

        const user = await User.findOne({email})

        if (!user) {
            return NextResponse.json({error: "User doesn't exists"}, {status: 400})
        }
        console.log("User Exits");

        const validPassword = bcryptjs.compare(password, user.password)
        
        if(!validPassword){
            return NextResponse.json({error: "check your password"}, {status: 400})
        } 

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "LoggedIn successfully",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}