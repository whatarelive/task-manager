"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar } from "@/components/ui/avatar"
import { Plus, Search, Users, Briefcase } from "lucide-react"

// Tipos para nuestros espacios de trabajo
type WorkspaceRole = "admin" | "editor" | "viewer"

type WorkspaceMember = {
  id: string
  name: string
  email: string
  avatar?: string
  role: WorkspaceRole
}

type Workspace = {
  id: string
  name: string
  description: string
  createdBy: string
  members: WorkspaceMember[]
  tasksCount: number
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
    tasksCount: 12,
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
    tasksCount: 8,
  },
  {
    id: "ws-3",
    name: "Personal",
    description: "Mis tareas personales",
    createdBy: "user-1",
    members: [currentUser],
    tasksCount: 5,
  },
]

export default function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces)
  const [searchQuery, setSearchQuery] = useState("")
  const [newWorkspace, setNewWorkspace] = useState({
    name: "",
    description: "",
  })
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<WorkspaceRole>("editor")
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(null)

  // Filtrar espacios de trabajo por búsqueda
  const filteredWorkspaces = workspaces.filter(
    (workspace) =>
      workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workspace.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Crear nuevo espacio de trabajo
  const createWorkspace = () => {
    if (newWorkspace.name.trim() === "") return

    const newWs: Workspace = {
      id: `ws-${Date.now()}`,
      name: newWorkspace.name,
      description: newWorkspace.description,
      createdBy: currentUser.id,
      members: [currentUser],
      tasksCount: 0,
    }

    setWorkspaces([...workspaces, newWs])
    setNewWorkspace({ name: "", description: "" })
  }

  // Invitar miembro a un espacio de trabajo
  const inviteMember = () => {
    if (!activeWorkspaceId || inviteEmail.trim() === "") return

    const newMember: WorkspaceMember = {
      id: `user-${Date.now()}`,
      name: inviteEmail.split("@")[0], // Nombre temporal basado en el email
      email: inviteEmail,
      role: inviteRole,
    }

    setWorkspaces(
      workspaces.map((workspace) =>
        workspace.id === activeWorkspaceId ? { ...workspace, members: [...workspace.members, newMember] } : workspace,
      ),
    )

    setInviteEmail("")
  }

  // Obtener el espacio de trabajo activo
  const getActiveWorkspace = () => {
    return workspaces.find((ws) => ws.id === activeWorkspaceId) || null
  }

  return (
        <div className="container mx-auto">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h1 className="text-3xl font-bold">Espacios de Trabajo</h1>
            <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar espacios..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Espacio
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Crear Espacio de Trabajo</DialogTitle>
                    <DialogDescription>
                      Crea un nuevo espacio para organizar tareas y colaborar con tu equipo.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nombre
                      </label>
                      <Input
                        id="name"
                        placeholder="Nombre del espacio de trabajo"
                        value={newWorkspace.name}
                        onChange={(e) => setNewWorkspace({ ...newWorkspace, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">
                        Descripción
                      </label>
                      <Input
                        id="description"
                        placeholder="Descripción breve"
                        value={newWorkspace.description}
                        onChange={(e) => setNewWorkspace({ ...newWorkspace, description: e.target.value })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={createWorkspace} disabled={!newWorkspace.name.trim()}>
                      Crear Espacio
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {filteredWorkspaces.length === 0 ? (
            <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <Briefcase className="mb-4 h-10 w-10 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-medium">No hay espacios de trabajo</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Crea tu primer espacio de trabajo para comenzar a organizar tus tareas y colaborar con otros.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Crear Espacio de Trabajo
                  </Button>
                </DialogTrigger>
                <DialogContent>{/* Contenido del diálogo (igual que arriba) */}</DialogContent>
              </Dialog>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredWorkspaces.map((workspace) => (
                <Card key={workspace.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <CardTitle>{workspace.name}</CardTitle>
                    <CardDescription>{workspace.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {workspace.members.slice(0, 3).map((member, index) => (
                          <Avatar key={member.id} className="border-2 border-background">
                            {member.name.charAt(0)}
                          </Avatar>
                        ))}
                        {workspace.members.length > 3 && (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                            +{workspace.members.length - 3}
                          </div>
                        )}
                      </div>
                      <Badge variant="secondary">{workspace.tasksCount} tareas</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link href={`/workspace/${workspace.id}`}>
                      <Button variant="outline">Ver Tareas</Button>
                    </Link>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setActiveWorkspaceId(workspace.id)}>
                          <Users className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Miembros del Espacio</DialogTitle>
                          <DialogDescription>Gestiona los miembros de {workspace.name}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-4">
                            {getActiveWorkspace()?.members.map((member) => (
                              <div key={member.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    {member.name.charAt(0)}
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{member.name}</p>
                                    <p className="text-sm text-muted-foreground">{member.email}</p>
                                  </div>
                                </div>
                                <Badge>{member.role}</Badge>
                              </div>
                            ))}
                          </div>
                          <div className="border-t pt-4">
                            <h4 className="mb-2 text-sm font-medium">Invitar nuevo miembro</h4>
                            <div className="flex gap-2">
                              <Input
                                placeholder="Email"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                className="flex-1"
                              />
                              <select
                                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={inviteRole}
                                onChange={(e) => setInviteRole(e.target.value as WorkspaceRole)}
                              >
                                <option value="admin">Admin</option>
                                <option value="editor">Editor</option>
                                <option value="viewer">Visor</option>
                              </select>
                              <Button onClick={inviteMember} disabled={!inviteEmail.trim()}>
                                Invitar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
  )
}
