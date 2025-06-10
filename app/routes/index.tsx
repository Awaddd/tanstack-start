import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useState } from 'react'

const greetTom = createServerFn({ method: "GET" }).handler(() => "Hello Tom")

const greetSomeone = createServerFn({ method: "POST" })
    .validator((name: string) => name)
    .handler(({ data }) => "Hello " + data)

export const Route = createFileRoute('/')({
    component: Home,
    loader: async () => await greetTom(),
})

function Home() {
    const [greeting, setGreeting] = useState<string>(Route.useLoaderData())

    return (
        <main className="h-screen flex flex-col jutify-center align-center p-10 dark bg-background text-foreground">
            <section>
                <Button
                    onClick={() => {
                        greetSomeone({ data: "Jane" }).then((data) => {
                            setGreeting(data)
                        })
                    }}
                >
                    {greeting}
                </Button>
            </section>
        </main>
    )
}