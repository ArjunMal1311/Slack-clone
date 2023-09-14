import { useModal } from '@/hooks/use-modal-store';
import { useRouter } from "next/navigation";
import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required."
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required."
  })
});

const CreateServerModel = () => {
  const { isOpen, onClose, type } = useModal();

  const router = useRouter()

  const isModalOpen = isOpen && type === "createServer";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    }
  });

  const isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    onClose();
  }
  
  return (
    <div></div>
  )
}

export default CreateServerModel