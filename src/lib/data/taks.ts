export const initialTags = [
    { id: "1", name: "Trabajo", color: "bg-red-500" },
    { id: "2", name: "Personal", color: "bg-blue-500" },
    { id: "3", name: "Urgente", color: "bg-yellow-500" },
    { id: "4", name: "Proyecto", color: "bg-green-500" },
]

export const initialTasks = [
    {
      id: "1",
      title: "Completar informe mensual",
      completed: false,
      dueDate: new Date(2023, 11, 15),
      tags: [initialTags[0], initialTags[2]],
    },
    {
      id: "2",
      title: "Llamar al médico para cita",
      completed: true,
      dueDate: new Date(2023, 11, 10),
      tags: [initialTags[1]],
    },
    {
      id: "3",
      title: "Preparar presentación para cliente",
      completed: false,
      dueDate: new Date(2023, 11, 20),
      tags: [initialTags[0], initialTags[3]],
    },
    {
      id: "4",
      title: "Comprar regalo de cumpleaños",
      completed: false,
      dueDate: new Date(2023, 11, 25),
      tags: [initialTags[1]],
    },
]