import getImage from '@/app/functions/getImage';
import { ImagePage } from '@/components/image-page';
import React from 'react'

export default async function page({params}) {
  const id = params.id;
  console.log(id);
  let image = await getImage(id)
  image = image.items[0]

  return (
    <>
    <ImagePage image={image}/>
    </>
  )
}
