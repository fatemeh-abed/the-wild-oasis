import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath =
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(
      `${supabaseUrl}/storage/v1/object/public/cabin-images/`,
    );

  let imagePath = newCabin.image;
  let imageName;

  // 1. Upload a new image only if one was selected
  if (!hasImagePath) {
    if (!newCabin.image) {
      throw new Error("Cabin image is required");
    }

    imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      console.error(storageError);
      throw new Error("Cabin image could not be uploaded");
    }

    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  // 2. Create or update the cabin
  let query = supabase.from("cabins");

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  // 3. If the database operation fails, clean up the new upload
  if (error) {
    if (imageName) {
      await supabase.storage.from("cabin-images").remove([imageName]);
    }
    if (hasImagePath) return data;

    console.error(error);
    throw new Error(
      id ? "Cabin could not be updated" : "Cabin could not be created",
    );
  }

  return data;
}
export async function deleteCabins(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
