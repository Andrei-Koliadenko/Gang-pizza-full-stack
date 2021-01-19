export default function toBase64(file:File) {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        // @ts-ignore
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}