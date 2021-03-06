import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from "firebase/firestore";
import db from '../../utils/fire'
import { useRouter } from 'next/router'
import { format } from 'date-fns'

import CaloryForm from '../../components/caloryForm'
import { FormModel } from '../../types/calory'

export default function CaloriesListPage() {
  const router = useRouter()
  const [id, setId] = useState<string>()
  const [calory, setCalory] = useState<FormModel>({
    title: " ",
    calory: 0,
    date: format(new Date(), 'yyyy-MM-dd'),
    kind: " ",
  })

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id as string
      setId(id);
    }
  }, [router]);

  useEffect(() => {
    if (id) {
      (async () => {
        const docRef = doc(db, "calories", id)
        const docSnap = await getDoc(docRef) as any
        const data = docSnap.data()
        setCalory({ ...data })
      })()
    }
  }, [id])

  const onSave = async (form: FormModel) => {
    const docRef = doc(db, "calories", id);
    await setDoc(docRef, { ...form })
    router.push('/calories')
  }

  return (
    <div>
      <CaloryForm formParams={calory} onSave={onSave} />
    </div>
  )
}