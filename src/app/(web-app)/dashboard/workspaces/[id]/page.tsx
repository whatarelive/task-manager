"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Plus, Search, Tag, User, Users } from "lucide-react"

// Tipos para nuestros datos
type WorkspaceRole = "admin" | "editor" | "viewer"

type WorkspaceMember = {
  id: string
  name: string
  email: string
  avatar?: string
  role: WorkspaceRole
}

type Workspace = {
  id: string,
  name: string
  description: string
  createdBy: string
  members: WorkspaceMember[]
}

type TaskTag = {
  id: string
  name: string
  color: string
  workspaceId: string
}

type Task = {
  id: string
  title: string
  completed: boolean
  dueDate: Date | null
  tags: TaskTag[]
  workspaceId: string
  assignedTo: string | null
}

// Datos de ejemplo
const currentUser: WorkspaceMember = {
  id: "user-1",
  name: "Carlos Rodríguez",
  email: "carlos@ejemplo.com",
  role: "admin",
}

const initialWorkspaces: Workspace[] = [
  {
    id: "ws-1",
    name: "Proyecto Marketing Q1",
    description: "Campañas de marketing para el primer trimestre",
    createdBy: "user-1",
    members: [
      currentUser,
      {
        id: "user-2",
        name: "Ana López",
        email: "ana@ejemplo.com",
        role: "editor",
      },
      {
        id: "user-3",
        name: "Miguel Sánchez",
        email: "miguel@ejemplo.com",
        role: "viewer",
      },
    ],
  },
  {
    id: "ws-2",
    name: "Desarrollo Web",
    description: "Proyecto de desarrollo del nuevo sitio web",
    createdBy: "user-1",
    members: [
      currentUser,
      {
        id: "user-4",
        name: "Laura Martínez",
        email: "laura@ejemplo.com",
        role: "editor",
      },
    ],
  },
  {
    id: "ws-3",
    name: "Personal",
    description: "Mis tareas personales",
    createdBy: "user-1",
    members: [currentUser],
  },
]

const initialTags: TaskTag[] = [
  { id: "tag-1", name: "Diseño", color: "bg-red-500", workspaceId: "ws-1" },
  { id: "tag-2", name: "Contenido", color: "bg-blue-500", workspaceId: "ws-1" },
  { id: "tag-3", name: "Urgente", color: "bg-yellow-500", workspaceId: "ws-1" },
  { id: "tag-4", name: "Frontend", color: "bg-green-500", workspaceId: "ws-2" },
  { id: "tag-5", name: "Backend", color: "bg-purple-500", workspaceId: "ws-2" },
  { id: "tag-6", name: "Personal", color: "bg-pink-500", workspaceId: "ws-3" },
]

const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Diseñar banner para campaña",
    completed: false,
    dueDate: new Date(2023, 11, 15),
    tags: [initialTags[0], initialTags[2]],
    workspaceId: "ws-1",
    assignedTo: "user-2",
  },
  {
    id: "task-2",
    title: "Redactar contenido para redes sociales",
    completed: true,
    dueDate: new Date(2023, 11, 10),
    tags: [initialTags[1]],
    workspaceId: "ws-1",
    assignedTo: "user-3",
  },
  {
    id: "task-3",
    title: "Implementar diseño responsive",
    completed: false,
    dueDate: new Date(2023, 11, 20),
    tags: [initialTags[3]],
    workspaceId: "ws-2",
    assignedTo: "user-4",
  },
  {
    id: "task-4",
    title: "Desarrollar API REST",
    completed: false,
    dueDate: new Date(2023, 11, 25),
    tags: [initialTags[4]],
    workspaceId: "ws-2",
    assignedTo: "user-1",
  },
  {
    id: "task-5",
    title: "Comprar regalo de cumpleaños",
    completed: false,
    dueDate: new Date(2023, 11, 18),
    tags: [initialTags[5]],
    workspaceId: "ws-3",
    assignedTo: "user-1",
  },
]

export default function WorkspaceInfoPage() {
  const params = useParams()
  const workspaceId = "ws-1";

  const [workspace, setWorkspace] = useState<Workspace | null>();
  const [tasks, setTasks] = useState<Task[]>([])
  const [tags, setTags] = useState<TaskTag[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Cargar datos del espacio de trabajo
  useEffect(() => {
    const foundWorkspace = initialWorkspaces.find((ws) => ws.id === workspaceId)
    if (foundWorkspace) {
      setWorkspace(foundWorkspace)
      setTags(initialTags.filter((tag) => tag.workspaceId === workspaceId))
      setTasks(initialTasks.filter((task) => task.workspaceId === workspaceId))
    }
  }, [workspaceId])

  // Filtrar tareas según la pestaña activa, búsqueda, etiqueta y asignado
  const filterTasks = (taskList: Task[], filter: string) => {
    let filtered = taskList

    // Filtrar por estado (completado/pendiente)
    if (filter === "pending") {
      filtered = filtered.filter((task) => !task.completed)
    } else if (filter === "completed") {
      filtered = filtered.filter((task) => task.completed)
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Filtrar por etiqueta
    if (selectedTag) {
      filtered = filtered.filter((task) => task.tags.some((tag) => tag.id === selectedTag))
    }

    // Filtrar por asignado
    if (selectedAssignee) {
      filtered = filtered.filter((task) => task.assignedTo === selectedAssignee)
    }

    return filtered
  }

  // Agregar nueva tarea
  const addTask = () => {
    if (!workspace || newTaskTitle.trim() === "") return

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      completed: false,
      dueDate: selectedDate,
      tags: selectedTag ? [tags.find((tag) => tag.id === selectedTag)!] : [],
      workspaceId: workspace.id,
      assignedTo: selectedAssignee,
    }

    setTasks([...tasks, newTask])
    setNewTaskTitle("")
    setSelectedDate(null)
    setSelectedTag(null)
    setSelectedAssignee(null)
  }

  // Cambiar estado de tarea (completada/pendiente)
  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  // Obtener miembro por ID
  const getMemberById = (memberId: string | null) => {
    if (!memberId || !workspace) return null
    return workspace.members.find((member) => member.id === memberId)
  }

  if (!workspace) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Cargando espacio de trabajo...</p>
      </div>
    )
  }

  return (
        <div className="container mx-auto">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h1 className="text-3xl font-bold">Tareas</h1>
            <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar tareas..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {/* <Select value={selectedTag || ""} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filtrar por etiqueta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas las etiquetas</SelectItem>
                  {tags.map((tag) => (
                    <SelectItem key={tag.id} value={tag.id ?? ""}>
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${tag.color}`} />
                        <span>{tag.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
              {/* <Select value={selectedAssignee || ""} onValueChange={setSelectedAssignee}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filtrar por asignado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los miembros</SelectItem>
                  {workspace.members.map((member) => (
                    <SelectItem key={member.id} value={member.id ?? "s" }>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5 text-sm">
                            {member.name.charAt(0)}
                        </Avatar>
                        <span>{member.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Agregar nueva tarea</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <Input
                      placeholder="¿Qué necesitas hacer?"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                    />
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        {/* <Select value={selectedTag || ""} onValueChange={setSelectedTag}>
                          <SelectTrigger>
                            <SelectValue placeholder="Etiqueta" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Sin etiqueta</SelectItem>
                            {tags.map((tag) => (
                              <SelectItem key={tag.id} value={tag.id ?? "s"}>
                                <div className="flex items-center gap-2">
                                  <div className={`h-3 w-3 rounded-full ${tag.color}`} />
                                  <span>{tag.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select> */}
                      </div>
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, "PPP", { locale: es }) : <span>Fecha límite</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={selectedDate!} onSelect={(e) => setSelectedDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        {/* <Select value={selectedAssignee || ""} onValueChange={setSelectedAssignee}>
                          <SelectTrigger>
                            <SelectValue placeholder="Asignar a" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Sin asignar</SelectItem>
                            {workspace.members.map((member) => (
                              <SelectItem key={member.id} value={member.id ?? "s"}>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-5 w-5 text-sm">
                                        {member.name.charAt(0)}
                                    </Avatar>
                                  <span>{member.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select> */}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={addTask} disabled={!newTaskTitle.trim()}>
                    <Plus className="mr-2 h-4 w-4" /> Agregar tarea
                  </Button>
                </CardFooter>
              </Card>

              <Tabs defaultValue="all" className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">Todas</TabsTrigger>
                  <TabsTrigger value="pending">Pendientes</TabsTrigger>
                  <TabsTrigger value="completed">Completadas</TabsTrigger>
                </TabsList>
                {["all", "pending", "completed"].map((filter) => (
                  <TabsContent key={filter} value={filter} className="mt-6">
                    {filterTasks(tasks, filter).length === 0 ? (
                      <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
                        <p className="text-muted-foreground">No hay tareas para mostrar</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filterTasks(tasks, filter).map((task) => (
                          <div
                            key={task.id}
                            className={`flex items-start justify-between rounded-lg border p-4 ${
                              task.completed ? "bg-muted/50" : ""
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <Checkbox
                                checked={task.completed}
                                onCheckedChange={() => toggleTaskStatus(task.id)}
                                className="mt-1"
                              />
                              <div>
                                <p
                                  className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                                >
                                  {task.title}
                                </p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {task.dueDate && (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <CalendarIcon className="h-3 w-3" />
                                      {format(task.dueDate, "PPP", { locale: es })}
                                    </div>
                                  )}
                                  {task.tags.map((tag) => (
                                    <Badge key={tag.id} variant="outline" className="flex items-center gap-1">
                                      <div className={`h-2 w-2 rounded-full ${tag.color}`} />
                                      {tag.name}
                                    </Badge>
                                  ))}
                                  {task.assignedTo && (
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                      <User className="h-3 w-3" />
                                      {getMemberById(task.assignedTo)?.name}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Miembros</CardTitle>
                  <CardDescription>Colaboradores en este espacio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {workspace.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5 text-sm">
                                {member.name.charAt(0)}
                            </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{tasks.filter((task) => task.assignedTo === member.id).length}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Users className="mr-2 h-4 w-4" /> Invitar miembros
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Etiquetas</CardTitle>
                  <CardDescription>Organiza tus tareas por categorías</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tags.map((tag) => (
                      <div key={tag.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${tag.color}`} />
                          <span>{tag.name}</span>
                        </div>
                        <Badge variant="outline">
                          {tasks.filter((task) => task.tags.some((t) => t.id === tag.id)).length}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Tag className="mr-2 h-4 w-4" /> Gestionar etiquetas
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
  )
}
