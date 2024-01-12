import { auth } from "../../firebase"

const user = auth.currentUser

export type User = {
    uid?: string | null,
    name?: string | null,
    email?: string | null,
    photo? : string | null,
    phone?: string | null,
    skills: string[],
    bio: string,
    link: string,
    location: string,
    verified: boolean,
    bookmarks?: string[],
}

export const defaultUser: User = {
    uid: user?.uid ??  "",
    name: user?.displayName ?? "",
    email: user?.email ?? "",
    photo: user?.photoURL ?? "",
    phone: user?.phoneNumber ?? "",
    skills: [],
    bio: "",
    link: "",
    location: "",
    verified: false,
    bookmarks: [],
}