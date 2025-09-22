import React, { useEffect, useRef, useState } from 'react'
import Profile from '../src/images/profile.svg'


const Settings = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState<string>(Profile);
  const [name, setName] = useState<string>('Guy');
  const [email, setEmail] = useState<string>('guy.@gmail.com');

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [nameDraft, setNameDraft] = useState<string>(name);
  const [emailDraft, setEmailDraft] = useState<string>(email);

  // Load saved values
  useEffect(() => {
    const savedImg = localStorage.getItem('settings:profileImage');
    const savedName = localStorage.getItem('settings:name');
    const savedEmail = localStorage.getItem('settings:email');
    if (savedImg) setProfileImage(savedImg);
    if (savedName) {
      setName(savedName);
      setNameDraft(savedName);
    }
    if (savedEmail) {
      setEmail(savedEmail);
      setEmailDraft(savedEmail);
    }
  }, []);

  const openFilePicker = () => fileInputRef.current?.click();

  const onImageSelected: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setProfileImage(dataUrl);
      localStorage.setItem('settings:profileImage', dataUrl);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const startEditName = () => {
    setNameDraft(name);
    setIsEditingName(true);
  };
  const saveName = () => {
    setName(nameDraft.trim());
    localStorage.setItem('settings:name', nameDraft.trim());
    setIsEditingName(false);
  };
  const cancelName = () => {
    setNameDraft(name);
    setIsEditingName(false);
  };

  const startEditEmail = () => {
    setEmailDraft(email);
    setIsEditingEmail(true);
  };
  const saveEmail = () => {
    setEmail(emailDraft.trim());
    localStorage.setItem('settings:email', emailDraft.trim());
    setIsEditingEmail(false);
  };
  const cancelEmail = () => {
    setEmailDraft(email);
    setIsEditingEmail(false);
  };

  return (
    <>    
    <div className='border-1 border-[#E4E4E4] m-30 p-10 rounded-2xl'>
        <h2 className='mb-[34px] text-[20px] font-rethink-sans text-[#3A3A3A]'>Primary Information</h2>
        <hr className='border-[#E4E4E4]'/>
        <div className='flex items-center justify-between mt-8 font-rethink-sans'>
            <h2 className='text-[16px] text-[#3A3A3A]'>Picture</h2>
            <img src={profileImage} alt="profile_img" className='w-[64px] h-[64px] object-cover rounded-full border border-[#E4E4E4]' />
            <button onClick={openFilePicker} className='group relative w-[78px] inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-[#ff008a] px-6 font-medium text-white font-jersey-10 transition-all duration-100 hover:bg-pink-700 cursor-pointer [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]'>Edit</button>
            <input ref={fileInputRef} type='file' accept='image/*' className='hidden' onChange={onImageSelected} />
        </div>
        <hr className='border-[#E4E4E4] mt-10'/>
        <div className='flex items-center justify-between mt-8 font-rethink-sans'>
            <h2 className='text-[16px] text-[#3A3A3A]'>Name</h2>
            {isEditingName ? (
              <input value={nameDraft} onChange={(e) => setNameDraft(e.target.value)} className='border border-[#E4E4E4] rounded-md px-3 py-2 w-[220px]' />
            ) : (
              <p className='text-[#3A3A3A]'>{name}</p>
            )}
            {isEditingName ? (
              <div className='flex gap-2'>
                <button onClick={saveName} className='group relative w-[78px] inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-[#ff008a] px-6 font-medium text-white font-jersey-10 transition-all duration-100 hover:bg-pink-700 cursor-pointer [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]'>Save</button>
                <button onClick={cancelName} className='group relative w-[78px] inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-gray-200 px-6 font-medium text-[#3A3A3A] font-jersey-10 transition-all duration-100 hover:bg-gray-300 cursor-pointer [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]'>Cancel</button>
              </div>
            ) : (
              <button onClick={startEditName} className='group relative w-[78px] inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-[#ff008a] px-6 font-medium text-white font-jersey-10 transition-all duration-100 hover:bg-pink-700 cursor-pointer [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]'>Edit</button>
            )}
        </div>
        <hr className='border-[#E4E4E4] mt-10'/>
        <div className='flex items-center justify-between mt-8 font-rethink-sans'>
            <h2 className='text-[16px] text-[#3A3A3A]'>Email</h2>
            {isEditingEmail ? (
              <input value={emailDraft} onChange={(e) => setEmailDraft(e.target.value)} className='border border-[#E4E4E4] rounded-md px-3 py-2 w-[220px]' />
            ) : (
              <p className='text-[#3A3A3A]'>{email}</p>
            )}
            {isEditingEmail ? (
              <div className='flex gap-2'>
                <button onClick={saveEmail} className='group relative w-[78px] inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-[#ff008a] px-6 font-medium text-white font-jersey-10 transition-all duration-100 hover:bg-pink-700 cursor-pointer [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]'>Save</button>
                <button onClick={cancelEmail} className='group relative w-[78px] inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-gray-200 px-6 font-medium text-[#3A3A3A] font-jersey-10 transition-all duration-100 hover:bg-gray-300 cursor-pointer [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]'>Cancel</button>
              </div>
            ) : (
              <button onClick={startEditEmail} className='group relative w-[78px] inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-[#ff008a] px-6 font-medium text-white font-jersey-10 transition-all duration-100 hover:bg-pink-700 cursor-pointer [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]'>Edit</button>
            )}
        </div>

    </div>
    </>

  )
}

export default Settings