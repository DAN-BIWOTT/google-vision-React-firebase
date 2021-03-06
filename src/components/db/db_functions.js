import { useEffect, useState } from 'react';
import db from '../../firebase';

const GetAllPhotographs = (collection) => {
	const[docs,setDocs] = useState([]);

	useEffect(()=>{
		const unsub = db.collection(collection)
		.orderBy('event','desc')
		.onSnapshot((snap)=>{
			let documents = [];
			snap.forEach(doc => {
				documents.push({...doc.data(),id: doc.id})
			});
			setDocs(documents);
		});
		return () => unsub();
	},[collection]);

	return {docs};
}

export { GetAllPhotographs };