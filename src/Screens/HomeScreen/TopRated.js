import React from 'react';
import {
	View,
	Text,
	TouchableWithoutFeedback,
	FlatList,
} from 'react-native';
import styles from './HomeScreen.style';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageBlurLoading from './../../components/ImageLoader';
export default class TopRated extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	_renderItem({ item, index }) {
		let avgReview = parseInt(item.avrage_review);
		let coverImage = item.cover_image
			? { uri: item.cover_image }
			: require('./../../Images/login-bg.jpg');
		return (
			<View
				style={styles.mapSlidCard}
				activeOpacity={1}>
				<TouchableWithoutFeedback
					onPress={() =>
						this.props.props.props.navigation.navigate('MapView', {
							mapID: item.id,
							mapName: item.name,
							mapData: item
						})
					}
				>
					<View>
						<ImageBlurLoading
							withIndicator
							style={styles.mapSlideCardImg}
							source={coverImage}
							thumbnailSource={{
								uri: 'https://discover-inn.com/upload/cover/map-image.jpeg',
							}}
						/>
						<View style={styles.mapSlideCardImg_overlay} />
						<View style={styles.mapSlideCardContent}>
							<View style={[styles.badgeRed, styles.badge]}>
								<Text style={[styles.badgeText]}>
									{item.views} <Feather name="eye" />
								</Text>
							</View>
							<View style={styles.rateList}>
								{Array(avgReview)
									.fill(1)
									.map((d, i) => {
										return (
											<MaterialCommunityIcons
												style={styles.starIcon}
												name="star"
												size={15}
												color="#FFAF2C"
												key={item.id + '_' + i}
											/>
										);
									})}
								{Array(5 - avgReview)
									.fill(1)
									.map((d, i) => {
										return (
											<MaterialCommunityIcons
												style={styles.starIcon}
												name="star-outline"
												size={15}
												color="#FFAF2C"
												key={'outline' + item.id + '_' + i}
											/>
										);
									})}
								<Text style={styles.rateListCount}>
									({item.total_review} Reviews)
								</Text>
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
				<Text style={styles.mapTitle}>{item.name}</Text>
				<Text style={styles.authorTitle}>{item.owner}</Text>
			</View>
		);
	}
	render() {
		return (
			<View style={styles.carouselMapView}>
				<FlatList
					data={this.props.props.props.topRatedMaps}
					renderItem={this._renderItem.bind(this)}
				/>
			</View>
		)
	}
}