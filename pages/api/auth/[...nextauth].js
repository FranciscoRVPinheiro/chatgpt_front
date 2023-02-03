import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // theme: {
  //   colorScheme: "dark", // "auto" | "dark" | "light"
  //   brandColor: "#000000", // Hex color code
  //   logo: "android-chrome-192x192.png", // Absolute URL to image
  //   buttonText: "#6366F1", // Hex color code
  // },
};
export default NextAuth(authOptions);
