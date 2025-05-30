import { create } from "zustand"
import type { Blog } from "../types/blog.types"
import { persist } from "zustand/middleware"
import { v4 as uuidv4 } from "uuid"

type UserStoreState = {
    blogs: Blog[]
    addBlog: (blog: Omit<Blog, 'id'>) => void
    readBlog: (id: string) => Blog
    editBlog: (id: string, blog: Partial<Blog>) => void
    deleteBlog: (id: string) => void
}

export const useBlogState = create<UserStoreState>()(
    persist(
        (set, get) => ({
            blogs: [],
            addBlog: (blog) => {
                const newBlog = { ...blog, id: uuidv4() }
                set((state) => ({ blogs: [...state.blogs, newBlog] }))
            },
            readBlog: (id) => {
                const found = get().blogs.find(blog => blog.id === id);
                if (!found) throw new Error("Blog not found");
                return found
            },
            editBlog: (id, newBlog) => {
                set((state) => ({ blogs: state.blogs.map((blog) => blog.id === id ? { ...blog, ...newBlog } : blog) }))
            },
            deleteBlog: (id) => set((state) => ({ blogs: state.blogs.filter(blog => blog.id !== id) })),
        }), {
        name: 'blog-storage'
    }
    )
)