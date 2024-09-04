import { connect } from "@/database/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server"
import { getDataFromToken } from "@/utils/getDataFromToken";

connect()

export async function POST(req: NextRequest) {
    const userId = await getDataFromToken(req)
    const user = await User.findOne({_id: userId}).select("-password")

    return NextResponse.json({
        message: "user Found",
        data: user
    })
}