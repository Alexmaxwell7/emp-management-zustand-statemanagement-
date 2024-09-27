import React from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUserList } from '../store/Store';
import { IoMdClose } from "react-icons/io";
import { PiWarningCircleLight } from "react-icons/pi";
import { deleteUserById } from '../services/employeeServices'; // Import the service

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: any;
    correspondingId?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message, correspondingId }) => {
    const { toggleCount, setToggleCount } = updateUserList();

    const handleDelete = async () => {
        try {
            await deleteUserById(correspondingId as string); // Call the delete service
            toast.error('Deleted successfully!', {
                autoClose: 3000,
                style: {
                    backgroundColor: '#FF0000', // Custom error color (red in this case)
                    color: '#fff', // Custom text color
                },
            });
            setTimeout(() => {
                setToggleCount(toggleCount + 1);
                onClose && onClose();
            }, 1000);
        } catch (error) {
            toast.error('Failed to delete user.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <IoMdClose onClick={onClose} className='float-right mb-5 text-2xl cursor-pointer' />
                {correspondingId && (
                    <div className='flex justify-center h-16'>
                        <PiWarningCircleLight className='text-5xl text-red-500 text-center' />
                    </div>
                )}
                <p className='mt-2'>{message}</p>

                {correspondingId && (
                    <div className='w-full'>
                        <button className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>
                            Yes
                        </button>
                    </div>
                )}
                <ToastContainer />
            </div>
        </div>
    );
};

export default Modal;
