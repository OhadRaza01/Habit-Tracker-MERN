import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (toEmail, resetLink) => {
    await resend.emails.send({
        from: "onboarding@resend.dev", // dev ke liye ye hi use hoga, apna domain verify karne tak
        to: toEmail,
        subject: "Reset your Habitly password",
        html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
        <h2>Reset your password</h2>
        <p>We received a request to reset your password. Click the button below to choose a new one:</p>
        <a href="${resetLink}" style="display:inline-block; background:#ff5a36; color:white; padding:10px 20px; border-radius:4px; text-decoration:none; margin: 16px 0;">
          Reset Password
        </a>
        <p>This link will expire in 15 minutes. If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
    });
};