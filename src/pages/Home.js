import React from 'react'
import Layout from "../components/Layout/Layout"
import Intro from '../components/profile/Intro'
import Education from '../components/profile/Education'
import SkillsList from '../components/profile/SkillsList'
import ProjectList from '../components/profile/ProjectList'
const Home = () => {
  return (
    <Layout>
      <Intro />
      <Education />
      <SkillsList />
      <ProjectList />
    </Layout>
  )
}

export default Home