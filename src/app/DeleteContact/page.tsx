'use client'

import React from 'react'
import NavBar from '../Component/NavBar'
import { gql, useQuery ,useMutation} from '@apollo/client'
import { BarLoader, ClimbingBoxLoader } from 'react-spinners'
import {
  MDBCol, MDBContainer, MDBRow, MDBCardBody, MDBCard,
  MDBCardTitle,
  MDBCardText, MDBTypography, MDBBtn
} from 'mdb-react-ui-kit'
import { useRouter } from 'next/navigation'



const GET_CONTACT_LIST = gql`
query getcontact{
  getContact{
    id
    name
    phonenumber
    email
    contactdetails
    socialmedia
  }
}
`
const DELTE_CONTACT = gql`
mutation deletecontact($id: ID!){
  deleteContact(ID: $id) {
    id
    name
  }
}
`


interface typeData {
  id: String,
  name: String,
  email: String,
  contactdetails: String,
  socialmedia: String,
  phonenumber:String


}

const DeleteContact = () => {
  const { data, loading, error } = useQuery(GET_CONTACT_LIST)
  const [deleteContact] = useMutation(DELTE_CONTACT)
  const Finaldata = data?.getContact
  console.log(Finaldata, 'Final Data')
  const Router = useRouter()
  console.log(error,'error')

  const handleClick = () => {
    Router.push('/postData')
  }

  const  handleDelete = (id) =>{
     deleteContact({
        variables:{id:id},
        
     })
     alert('Contact Deleted Succesfully')
     Router.push('/getData')

     
    
   
  }


  return (
    <>
      <NavBar />
      <section>
        <MDBContainer>
          <MDBRow size={12}>
            <MDBCardBody className='mt-5'>
              
              <div className='d-flex justify-content-center'>
                {loading && <BarLoader size={10} color='red' />
                }
              </div>
              <MDBTypography tag='div' className='display-2 pb-3 mb-3 border-bottom'>
                <h2 className='lead mb-0'>Number of Contact - {loading && <BarLoader />} {Finaldata?.length}</h2>
              </MDBTypography>
              {Finaldata?.map((data: typeData) => {
                return (
                  <MDBCard className='mt-3'>
                    <MDBCardBody>
                      <MDBCardTitle>Contact Name - {data.name}</MDBCardTitle>
                      <MDBCardText>
                        PhoneNumber - {data.phonenumber}
                      </MDBCardText>
                      <MDBCardText>
                        Email - {data.email}
                      </MDBCardText>
                      <MDBCardText>
                        Contactdetails - {data.contactdetails}
                      </MDBCardText>
                      <MDBCardText>
                        Socialmedia - {data.socialmedia}
                      </MDBCardText>
                      <div className='d-flex justify-content-end py-5'>
                     <MDBBtn onClick={()=>{
                        handleDelete(data.id)
                     }}>Delete Contact</MDBBtn>
                       </div>
                    </MDBCardBody>
                  </MDBCard>
                )
              })}
            </MDBCardBody>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  )
}





export default DeleteContact