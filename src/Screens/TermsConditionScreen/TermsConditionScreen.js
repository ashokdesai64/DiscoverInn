import React, {Fragment} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {ListItem, CheckBox, Picker, Textarea} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../components/header/header';
import styles from './TermsConditionScreen.style';

class TermsConditionScreen extends React.Component {
  render() {
    return (
      <Fragment>
        <Header
          showBack={true}
          title={''}
          {...this.props}
          style={styles.bgTransparent}
        />
        <ScrollView style={styles.container}>
          <View style={styles.termsTitle}>
            <View style={styles.termsTitleLine}></View>
            <Text style={styles.termsTitleText}>Terms & Conditions</Text>
          </View>
          <View style={styles.termsCard}>
            <Text style={styles.termsCardText}>
              These terms and conditions ("Terms", "Agreement") are an agreement
              between Website Operator ("Website Operator", "us", "we" or "our")
              and you ("User", "you" or "your"). This Agreement sets forth the
              general terms and conditions of your use of the discover-inn.com
              website and any of its products or services (collectively,
              "Website" or "Services").
            </Text>
          </View>
          <View style={styles.termsContent}>
            <Text style={styles.termsContentTitle}>
              Accounts and membership
            </Text>
            <Text style={styles.termsCardText}>
              If you create an account on the Website, you are responsible for
              maintaining the security of your account and you are fully
              responsible for all activities that occur under the account and
              any other actions taken in connection with it. Providing false
              contact information of any kind may result in the termination of
              your account. You must immediately notify us of any unauthorized
              uses of your account or any other breaches of security. We will
              not be liable for any acts or omissions by you, including any
              damages of any kind incurred as a result of such acts or
              omissions. We may suspend, disable, or delete your account (or any
              part thereof) if we determine that you have violated any provision
              of this Agreement or that your conduct or content would tend to
              damage our reputation and goodwill. If we delete your account for
              the foregoing reasons, you may not re-register for our Services.
              We may block your email address and Internet protocol address to
              prevent further registration.
            </Text>
            <Text style={styles.termsContentTitle}>User content</Text>
            <Text style={styles.termsCardText}>
              We do not own any data, information or material ("Content") that
              you submit on the Website in the course of using the Service. You
              shall have sole responsibility for the accuracy, quality,
              integrity, legality, reliability, appropriateness, and
              intellectual property ownership or right to use of all submitted
              Content. We may, but have no obligation to, monitor Content on the
              Website submitted or created using our Services by you. Unless
              specifically permitted by you, your use of the Website does not
              grant us the license to use, reproduce, adapt, modify, publish or
              distribute the Content created by you or stored in your user
              account for commercial, marketing or any similar purpose. But you
              grant us permission to access, copy, distribute, store, transmit,
              reformat, display and perform the Content of your user account
              solely as required for the purpose of providing the Services to
              you. Without limiting any of those representations or warranties,
              we have the right, though not the obligation, to, in our own sole
              discretion, refuse or remove any Content that, in our reasonable
              opinion, violates any of our policies or is in any way harmful or
              objectionable.
            </Text>
            <Text style={styles.termsContentTitle}>Backups</Text>
            <Text style={styles.termsCardText}>
              We perform regular backups of the Website and Content and will do
              our best to ensure completeness and accuracy of these backups. In
              the event of the hardware failure or data loss we will restore
              backups automatically to minimize the impact and downtime.
            </Text>
            <Text style={styles.termsContentTitle}>
              Links to other websites
            </Text>
            <Text style={styles.termsCardText}>
              Although this Website may be linked to other websites, we are not,
              directly or indirectly, implying any approval, association,
              sponsorship, endorsement, or affiliation with any linked website,
              unless specifically stated herein. We are not responsible for
              examining or evaluating, and we do not warrant the offerings of,
              any businesses or individuals or the content of their websites. We
              do not assume any responsibility or liability for the actions,
              products, services, and content of any other third-parties. You
              should carefully review the legal statements and other conditions
              of use of any website which you access through a link from this
              Website. Your linking to any other off-site websites is at your
              own risk.
            </Text>
            <Text style={styles.termsContentTitle}>Changes and amendments</Text>
            <Text style={styles.termsCardText}>
              We reserve the right to modify this Agreement or its policies
              relating to the Website or Services at any time, effective upon
              posting of an updated version of this Agreement on the Website.
              When we do, we will revise the updated date at the bottom of this
              page. Continued use of the Website after any such changes shall
              constitute your consent to such changes. Policy was created with
              WebsitePolicies.
            </Text>
            <Text style={styles.termsContentTitle}>
              Acceptance of these terms
            </Text>
            <Text style={styles.termsCardText}>
              You acknowledge that you have read this Agreement and agree to all
              its terms and conditions. By using the Website or its Services you
              agree to be bound by this Agreement. If you do not agree to abide
              by the terms of this Agreement, you are not authorized to use or
              access the Website and its Services.
            </Text>
            <Text style={styles.termsContentTitle}>Contacting us</Text>
            <Text style={styles.termsCardText}>
              If you have any questions about this Agreement, please contact us.
            </Text>
            <Text style={styles.termsCardText}>
              This document was last updated on April 29, 2019
            </Text>
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}
export default TermsConditionScreen;
