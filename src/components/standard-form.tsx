"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"  // ShadCN Button component
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"  // ShadCN Form components
import { Input } from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
// Define your validation schema using zod
const formSchema = z.object({
    email: z.string({ required_error: "Email is required" })
        .email({ message: "Please enter a valid email address." })
        .min(5, { message: "Email must be at least 5 characters long." }),
    selectedOption: z.string({ required_error: "Selecting an option is required" }),
    comments: z.string()
        .max(500, { message: "Comments must be 500 characters or less." })
        .optional()
});

export function StandardForm() {
    // Set up useForm with validation and zod resolver
    const form = useForm({
        resolver: zodResolver(formSchema),
    })

    // Define the submit handler
    const onSubmit = async (data: any) => {
        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(data),
            });

            if (!response.ok) { throw new Error('Failed to submit the form'); }

            const responseData = await response.json();
            console.log('Response from server:', responseData);
        } catch (error) {
            console.error('Error during submission:', error);
        }
    };


    return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                    {/* Input field */}
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage className="flex" />
                            </FormItem>
                        )}
                    />

                    {/* Select Field */}
                    <FormField
                        control={form.control}
                        name="selectedOption"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hospital *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Hospital" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="uab">UAB</SelectItem>
                                        <SelectItem value="grandview">Grandview</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage className="flex" />
                            </FormItem>
                        )}
                    />

                    {/* Comments Field */}
                    <FormField
                        control={form.control}
                        name="comments"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Additional Comments (optional)</FormLabel>
                                {/*<FormDescription>*/}
                                {/*    This is your public display name.*/}
                                {/*</FormDescription>*/}
                                <FormControl>
                                    {/* Input field */}
                                    <Textarea placeholder="Enter any additional comments you would like us to know" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* Submit Button */}
                    <Button className="w-full cursor-pointer" type="submit">Submit</Button>
                </form>
            </Form>
    )
}
