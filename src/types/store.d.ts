/**
 * banner条
 */
type Banner = {
	imageUrl: string,
	typeTitle: string,
	titleColor: string,
	targetType: number,
	targetId: number,
	[propName: string]: any
}

/**
 * 作者
 */
type Creator = {
	avatarUrl: string,
	signature: string,
	nickname: string,
	userId: number
}
/**
 * 推荐
 */
type Recommend = {
	alg?: string,
	canDisLike?: boolean,
	copywriter?: string,
	highQuality?: boolean,
	id?: number,
	name: string,
	picUrl: string,
	playCount: number,
	trackCount?: number,
	type?: number
}

/**
 * 歌曲描述
 */
type Track = {
	id: number,
	name: string,
	ar: Array<{
		id: number,
		name: string,
		[propName: string]: any
	}>,
	[propName: string]: any
}
/**
 * 歌单
 */
type SongSheet = {
	coverImgUrl: string,
	description: string,
	name: string,
	playCount: number,
	creator: Creator,
	tags?: Array<string>,
	trackCount: Array<number | string | object>,
	trackIds: Array<number>,
	tracks: Array<Track>,
	userId: number,
	id: number,
	commentCount: number,
	shareCount: number,
	[propName: string]: any
}

/**
 * 歌曲详情
 */
type SongDetail = {
	name: string,
	al: {
		id: number,
		name: string,
		pic: number,
		picUrl: string,
	},
	ar: Array<{
		cd: string,
		name: string
	}>
	url: string
}
/**
 * 歌曲列表详情
 */
type MusicsDetail = {
	privileges: Array<any>,
	songs: Array<SongDetail>
}

