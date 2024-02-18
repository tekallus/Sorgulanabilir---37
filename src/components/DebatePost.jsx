import { useState } from 'react'
import PostComments from './PostComments'
import PostContent from './PostContent'
import postData from '../postData'

export default function DebatePost() {
  /* Challenge 

Form çalışmıyor. Göreviniz, kullanıcı "Gönder "e tıkladığında gönderiye bir yorum ekleyen kontrollü bir form yapmaktır.

    1. Yorum, yorum dizisinin alt kısmında, girilen kullanıcı adı ve yorum metni önceki yorumlar gibi görüntülenecek şekilde görünmelidir. 
       
    2. Yorum, önceki yorumların verilerini içeren array'e eklenmelidir. 
    
    3. Girilen kullanıcı adı kaydedilmeli, ancak kullanıcı onay kutusunu işaretlerse "AnonimKullanıcı" olarak görünmelidir.
    
    4. Kullanıcı formu göndermek için text input elemanına ve comment box elemanına metin girmek zorunda olmalı ve kullanıcı bir yorum gönderdikten sonra elemanlar ve onay kutusu temizlenmelidir. Sayfa yüklendiğinde de boş olmalıdırlar.   
        
    5. Kodunuz tamamen bu dosyanın içinde yer alabilir, ancak isterseniz bazı kısımları taşıyabilirsiniz. 

*/
  // 1. useState kullanarak gerekli state'leri tanımlayalim
  const [comments, setComments] = useState(postData.comments)
  const [username, setUsername] = useState('')
  const [commentText, setCommentText] = useState('')
  const [anonymous, setAnonymous] = useState(false)

  // 2. Kullanıcı adı alanındaki değişiklikler için event handler

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  // 3. Yorum metni alanındaki değişiklikler için event handler

  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value)
  }
  // 4. Anonim gönderim seçeneğindeki değişiklikler için event handler

  const handleAnonymousChange = (event) => {
    setAnonymous(event.target.checked)
    if (event.target.checked) {
      setUsername('AnonimKullanıcı')
    } else {
      setUsername('')
    }
  }
  // 5. Form gönderildiğinde çağrılacak event handler
  const handleSubmit = (event) => {
    event.preventDefault()
    // 5a. Yorum metni alanının boş olup olmadığını kontrol etme
    if (!commentText) {
      alert('Lütfen yorum alanını doldurun.')
      return
    }
    // 5b. Yeni yorum objesi oluşturma
    const newComment = {
      userName: username || 'AnonimKullanıcı',
      isAnonymous: anonymous,
      commentText: commentText,
      id: Math.random().toString(), // Örnek bir ID oluşturmak için kullanılan örnek bir yöntem. Gerçek bir uygulamada daha güvenli bir ID oluşturulmalıdır.
    }
    // 5c. Yeni yorumu mevcut yorumlar listesine ekleyerek state'i güncelleme
    setComments([...comments, newComment])
    // 5d. Form alanlarını temizleme
    setUsername('')
    setCommentText('')
    setAnonymous(false)
  }

  return (
    <div className="post-container">
      {/* PostContent bileşeni */}
      <PostContent data={{ ...postData }} />
      {/* PostComments bileşeni, mevcut yorumları gösterir */}
      <PostComments data={comments} />
      {/* Yorum göndermek için form */}
      <form onSubmit={handleSubmit}>
        {/* Kullanıcı adı input alanı */}
        <input
          className="text-input"
          type="text"
          placeholder="Kullanıcı adı girin."
          value={username}
          onChange={handleUsernameChange}
          disabled={anonymous}
          required
        />
        {/* Yorum metni textarea alanı */}
        <textarea
          placeholder="Ne düşünüyorsunuz?"
          value={commentText}
          onChange={handleCommentTextChange}
          required
        />
        {/* Anonim gönderim seçeneği checkbox */}
        <label>
          <input
            className="checkbox"
            type="checkbox"
            checked={anonymous}
            onChange={handleAnonymousChange}
          />
          İsimsiz mi göndereyim?
        </label>
        {/* Gönder butonu */}
        <button type="submit">Gönder</button>
      </form>
    </div>
  )
}
