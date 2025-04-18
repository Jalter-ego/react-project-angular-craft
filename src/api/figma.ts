import { FigmaProps, UpdateFigma } from '../lib/types';
import {api} from '../api/index'

export const fetchCreateFigmac = async(newFigma: FigmaProps) =>{
    const serverResponse = await fetch(api + "/figma", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFigma ),
      });
      
      const data = await serverResponse.json();
      console.log(data)
      return data;
}

export const fetchUpdateFigma = async(id: string, updateFigma: UpdateFigma) => {
  const serverResponse = await fetch(`${api}/figma/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateFigma),
  });

  const data = await serverResponse.json();
  return data;
}

export const fetchFindOneFigma = async(id: string) => {
  const serverResponse = await fetch(`${api}/figma/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const data = await serverResponse.json();
  return data;
}

export const fetchAllByUserFigma = async(email: string) => {
  console.log(email);
  
  const serverResponse = await fetch(`${api}/figma/by-email/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const data = await serverResponse.json();
  return data;
}

export const fetchUpdateImageFigma = async(id: string,image: string) => {
  console.log(image);
  
  const serverResponse = await fetch(`${api}/figma/image/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({image})
  });

  const data = await serverResponse.json();
  return data;
}

export const fetchDeleteFigma = async(id: string)=>{
  const serverResponse = await fetch(`${api}/figma/${id}`,{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const result = await serverResponse.json()
  return result
}


export const uploadImage = async (file: Blob) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'AngularCraft');

  const response = await fetch('https://api.cloudinary.com/v1_1/drugalhsm/image/upload', {
      method: 'POST',
      body: formData,
  });

  const data = await response.json();
  return data.secure_url;
};
