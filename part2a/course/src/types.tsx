export interface Course {
    id: number
    name: string
    parts: PartType[]
}

export interface PartType {
    title: string
    exercises: number
    id: number
}
