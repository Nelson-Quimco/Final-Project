import React, { useEffect, useState } from "react";
import Input from "../input/Input";
import Button from "../buttons/Button";
import useUserdata from "@/hooks/useUserdata";
import { IoIosCloseCircle } from "react-icons/io";
import useUserProfile from "@/hooks/requests/user-profile/useUserProfile";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
}

const EditUserModal = (props: Props) => {
  const { isOpen, onClose } = props;

  const user = useUserdata();
  const { userData, getUserInformation, changeUserProfile } = useUserProfile();

  const [userID, setUserID] = useState(0);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      getUserInformation(user?.userId);
    }
  }, [userID]);

  useEffect(() => {
    if (userData?.user) {
      setFirstname(userData.user.firstName || "");
      setLastname(userData.user.lastName || "");
      setUsername(userData.user.username || "");
      setEmail(userData.user.email || "");
      setUserID(userData.user.userId || 0);
    }
  }, [userData]);
  const handleEditProfile = async () => {
    if (user?.userId) {
      await changeUserProfile(
        user.userId,
        firstname,
        lastname,
        username,
        email
      );
      if (onClose) onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="flex relative flex-col border rounded-[15px] bg-offWhite bg-opacity-100 w-[30rem] h-[70%] z-20 gap-8 p-[3rem] my-10">
        <IoIosCloseCircle
          className="absolute top-2 right-2 cursor-pointer"
          size={30}
          onClick={onClose}
        />
        <div className="text-center">
          <p className="font-bold text-[30px]">Edit User Profile</p>
        </div>
        <div>
          <form className="flex flex-col gap-6">
            <div>
              <p className="font-bold">First Name:</p>
              <Input
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
              />
            </div>
            <div>
              <p className="font-bold">Last Name:</p>
              <Input
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
              />
            </div>
            <div>
              <p className="font-bold">User Name:</p>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div>
              <p className="font-bold">Email:</p>
              <Input onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div className=" flex justify-center">
              <Button name="Edit Profile" onClick={() => handleEditProfile()} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
