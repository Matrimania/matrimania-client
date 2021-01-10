import React, { useState } from 'react';
import Photo from '../Photo/Photo';


type NewPhoto = {
  id: number;
  photoNumber: string;
  guests: string[];
  description: string;
}

type WeddingData = {
	changeView: any;
}

const PhotoListForm: React.FC<WeddingData> = ({changeView}) => {
  return (
    <>
    PhotoListForm
    </>
	)
}

export default PhotoListForm;
