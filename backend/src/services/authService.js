import { User } from "../models/user.model.js";

const generateUsernameFromEmail = async (email) => {
    const base = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
    let username = base;
    let suffix = 0;

    // ensure uniqueness — append a number if taken
    while (await User.findOne({ username })) {
        suffix += 1;
        username = `${base}${suffix}`;
    }

    return username;
};

export const findOrCreateGoogleUser = async ({ email, fullName, googleId, avatar }) => {
    // 1. Already signed up with Google before?
    let user = await User.findOne({ googleId });
    if (user) return user;

    // 2. Existing local account with the same email? Link Google to it.
    user = await User.findOne({ email });
    if (user) {
        if (!user.googleId) {
            user.googleId = googleId;
            user.provider = user.provider === "local" ? "local" : "google"; // keep local if they already had a password
            if (avatar && !user.avatar) user.avatar = avatar;
            await user.save();
        }
        return user;
    }

    // 3. Brand new user
    const username = await generateUsernameFromEmail(email);

    user = await User.create({
        fullName,
        username,
        email,
        provider: "google",
        googleId,
        avatar,
        // password omitted — not required since provider !== "local"
    });

    return user;
};