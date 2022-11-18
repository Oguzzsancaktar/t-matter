import { CgWebsite } from 'react-icons/cg'
import {
  FiClock,
  FiFacebook,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiTwitch,
  FiTwitter,
  FiYoutube
} from 'react-icons/fi'
import { BiCurrentLocation } from 'react-icons/bi'
import { FaDiscord, FaPinterest, FaReddit, FaSkype, FaSnapchat, FaTelegram, FaWhatsapp } from 'react-icons/fa'

export const selectIconWithText = (icon: string) => {
  const findIcon = (icon: string) => {
    switch (icon) {
      case 'clock':
        return <FiClock />
      case 'mail':
        return <FiMail />
      case 'phone':
        return <FiPhone />
      case 'website':
        return <CgWebsite />
      case 'location':
        return <BiCurrentLocation />
      case 'facebook':
        return <FiFacebook />
      case 'instagram':
        return <FiInstagram />
      case 'twitter':
        return <FiTwitter />
      case 'linkedin':
        return <FiLinkedin />
      case 'youtube':
        return <FiYoutube />
      case 'github':
        return <FiGithub />
      case 'twitch':
        return <FiTwitch />
      case 'discord':
        return <FaDiscord />
      case 'whatsapp':
        return <FaWhatsapp />
      case 'telegram':
        return <FaTelegram />
      case 'skype':
        return <FaSkype />
      case 'snapchat':
        return <FaSnapchat />
      case 'pinterest':
        return <FaPinterest />
      case 'reddit':
        return <FaReddit />
    }
  }

  return findIcon(icon)
}
