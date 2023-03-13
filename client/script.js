const button = document.querySelector("button")

button.addEventListener("click", () => {
  fetch("http://localhost:3000/api/v1/stripe/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      student: {
        student_id: 'UqS5MbD2RtPxJ83LWCgapm8tXBj2'
      },
      applications: [
        {
          application_id: "a3cba015-3737-4b04-85ef-b5b877d13ce2",
          application_project: {
            project_id: "16953c52-e0dc-4641-8c0a-2192afac03e6",
            project_name: "Football Booking",
            description:
              "The system to manage field of the field owner and the field booking schedule of customer in Ha Noi",
            price: 20,
            image:
              "https://storage.googleapis.com/react-auth-bc0a4.appspot.com/userr.jpg?GoogleAccessId=firebase-adminsdk-c5k74%40react-auth-bc0a4.iam.gserviceaccount.com&Expires=1679011200&Signature=IPVoB3r%2FACG3mA6QrrXzBAso0oBpCI%2BjTaLUo%2FdLMglclHxnfR9Mto5ZCRcAnOY2RNtDbUtzu3QRTntSe83ujNLOPGliE3xMwwa7EFlrUfsZ5EUEJcbHRXY%2BFrPZQYMGxqjreQHA9lHZiqevplC%2FMgnuLIt2FG1nLwNpRnu6yU0C%2B6KpqgN59DNKAhQSROM7%2B9rbgBu5DlSXUKYe0nu30PvvtYooWOjPhIb%2BIGYQBfDQPkvaGZ7n35LB4p%2FlEDTSGAax8%2BggH6QYMu%2Bi6KjvQXPs4KWRBe2g8QY%2Fi5ubZ0kviwHkUhimES9O937KzYmGC%2BuSashCp03xYfCpVXpncg%3D%3D",
          },
        },
        {
          application_id: "a",
          application_project: {
            project_id: "16953c52-e0dc-4641-8c0a-2192afac03e6",
            project_name: "Football ",
            description:
              "The system to manage field of the field owner and the field booking schedule of customer in Ha Noi",
            price: 20,
            image:
              "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
          },
        },
      ],
    })
  })
    .then(res => {
      if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
      window.location = url
    })
    .catch(e => {
      console.error(e.error)
    })
})
