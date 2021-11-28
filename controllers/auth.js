const User = require("../models/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		return res.status(404).json({ msg: "User does not exist" });
	}

	try {
		const passwordsMatch = await bcrypt.compare(password, user.password);

		if (passwordsMatch) {
			// Log user in with jwt
			const payload = {
				user: {
					id: user._id,
				},
			};

			jwt.sign(
				payload,
				process.env.jwtSecret,
				{
					expiresIn: 3600,
				},
				(err, token) => {
					if (err) throw err;
					res.status(200).json({ token });
				}
			);
		} else {
			return res.status(401).json({ msg: "Password incorrect" });
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: "Server error" });
	}
};

exports.register = async (req, res) => {
	const { name, email, password, password2 } = req.body;

	if (password !== password2) {
		return res.status(401).json({ msg: "Passwords do not match" });
	}

	try {
		const user = await User.findOne({ email });

		if (user) {
			return res.status(401).json({ msg: "User with email already exists" });
		}

		const hashedPasword = await bcrypt.hash(password, 12);

		const newUser = new User({
			name,
			email,
			password: hashedPasword,
		});

		await newUser.save();

		// Log user in using jwt
		const payload = {
			user: {
				id: newUser._id,
			},
		};

		jwt.sign(
			payload,
			process.env.jwtSecret,
			{
				expiresIn: 3600,
			},
			(err, token) => {
				if (err) throw err;
				res.status(200).json({ token });
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: "Server error" });
	}
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ msg: 'No user found' });
        }

        res.status(200).json({ user })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
}