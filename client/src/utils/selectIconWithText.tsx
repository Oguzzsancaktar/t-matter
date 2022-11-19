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

export const selectIconWithText = (icon: string, size: string = '40', color: string = '#000000') => {
  const findIcon = (icon: string) => {
    switch (icon) {
      case 'clock':
        return <FiClock size={size} color={color} />
      case 'mail':
        return <FiMail size={size} color={color} />
      case 'phone':
        return <FiPhone size={size} color={color} />
      case 'website':
        return <CgWebsite size={size} color={color} />
      case 'location':
        return <BiCurrentLocation size={size} color={color} />
      case 'facebook':
        return <FiFacebook size={size} color={color} />
      case 'instagram':
        return <FiInstagram size={size} color={color} />
      case 'twitter':
        return <FiTwitter size={size} color={color} />
      case 'linkedin':
        return <FiLinkedin size={size} color={color} />
      case 'youtube':
        return <FiYoutube size={size} color={color} />
      case 'github':
        return <FiGithub size={size} color={color} />
      case 'twitch':
        return <FiTwitch size={size} color={color} />
      case 'discord':
        return <FaDiscord size={size} color={color} />
      case 'whatsapp':
        return <FaWhatsapp size={size} color={color} />
      case 'telegram':
        return <FaTelegram size={size} color={color} />
      case 'skype':
        return <FaSkype size={size} color={color} />
      case 'snapchat':
        return <FaSnapchat size={size} color={color} />
      case 'pinterest':
        return <FaPinterest size={size} color={color} />
      case 'reddit':
        return <FaReddit size={size} color={color} />
    }
  }

  return findIcon(icon)
}
