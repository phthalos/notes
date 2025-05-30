import pool from "../../lib/db";

export default async function handler(req, res) {
    const {method} = req;

    switch (method) {
        case "GET":
            try{
                const [rows] = await pool.execute("")
            }
    }
}