import { mapGetters, mapActions } from 'vuex'

/**
 * @description 多标签页
 */
export default {
  computed: {
    ...mapGetters(['stackTags', 'cachedTags', 'visitedTags', 'currentTag'])
  },
  methods: {
    ...mapActions([
      'AddTags',
      'AddCachedTags',
      'AddVisitedTags',
      'DelTags',
      'DelCachedTags',
      'DelVisitedTags',
      'DelOthersTags',
      'DelOthersCachedTags',
      'DelOthersVisitedTags',
      'DelAllTags',
      'DelAllCachedTags',
      'DelAllVisitedTags',
      'RefreshAllTags',
      'UpdateVisitedTags',
      'DelCurrentTag',
      'InjectMultiple',
      'ClearMultiple'
    ])
  }
}
