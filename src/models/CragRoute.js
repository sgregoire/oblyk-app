import ActiveData from '@/models/ActiveData'
import CragSector from '@/models/CragSector'
import Crag from '@/models/Crag'
import CragRouteApi from '@/services/oblyk-api/CragRouteApi'

export default class CragRoute extends ActiveData {
  find (CragId, id) {
    return this.apiFind(CragRouteApi, CragId, id)
  }

  path (page = 'infos') {
    return `/crags/${this.crag.id}/${this.crag.slug_name}/routes/${this.id}/${this.slug_name}/${page}`
  }

  coverUrl () {
    if (this.photo.url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.url}`
    } else if (this.crag_sector.photo.url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.crag_sector.photo.url}`
    } else if (this.crag.photo.url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.crag.photo.url}`
    } else {
      return require('@/assets/default-crag-banner.jpg')
    }
  }

  get coverFrom () {
    if (this.photo.url) {
      return 'cragRoute'
    } else if (this.crag_sector.photo.url) {
      return 'cragSector'
    } else if (this.crag.photo.url) {
      return 'crag'
    } else {
      return null
    }
  }

  thumbnailCoverUrl () {
    if (this.photo.thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.thumbnail_url}`
    } else {
      return require('@/assets/default-crag-banner.jpg')
    }
  }

  get CragSector () {
    const cragSector = new CragSector(this.crag_sector)
    cragSector.crag = this.crag
    return cragSector
  }

  get Crag () {
    return new Crag(this.crag)
  }

  isAnchorable (value = null) {
    const accepted = [
      'sport_climbing',
      'multi_pitch',
      'trad_climbing',
      'aid_climbing'
    ]
    return accepted.includes(value || this.climbing_type)
  }

  isStartable (value = null) {
    const accepted = [
      'bouldering'
    ]
    return accepted.includes(value || this.climbing_type)
  }

  isReceptionable (value = null) {
    const accepted = [
      'bouldering'
    ]
    return accepted.includes(value || this.climbing_type)
  }

  isBoltable (value = null) {
    const accepted = [
      'sport_climbing',
      'multi_pitch',
      'trad_climbing'
    ]
    return accepted.includes(value || this.climbing_type)
  }
}
