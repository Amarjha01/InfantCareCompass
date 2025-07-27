async function logOut(req, res) {

    try {

        res.clearCookie("token");

        res.status(200).json({
            message: "User logged out successfully",
            error: false,
            success: true,
            data: []
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            sucess: false

        });
    }
}

export default logOut;