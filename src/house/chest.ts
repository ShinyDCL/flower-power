import { ACTIONS } from '../constants';
import { Model } from '../model';

export class Chest extends Model {
  private readonly openSound = new AudioClip('models/chest/sounds/open.mp3');
  private readonly closeSound = new AudioClip('models/chest/sounds/close.mp3');
  private readonly open = 'open';
  private readonly close = 'close';
  private isOpen = false;

  constructor(model: Model) {
    super(model);

    this.entity.addComponent(
      new OnPointerDown(this.toggle.bind(this), { hoverText: ACTIONS.open })
    );

    const animator = new Animator();
    animator.addClip(new AnimationState(this.open, { looping: false }));
    animator.addClip(new AnimationState(this.close, { looping: false }));
    this.entity.addComponent(animator);
  }

  private toggle() {
    const animator = this.entity.getComponent(Animator);
    const openClip = animator.getClip(this.open);
    const closeClip = animator.getClip(this.close);

    openClip.stop();
    closeClip.stop();

    if (this.isOpen) {
      closeClip.play();
      this.entity.addComponentOrReplace(new AudioSource(this.closeSound));
      this.entity.getComponent(OnPointerDown).hoverText = ACTIONS.open;
    } else {
      openClip.play();
      this.entity.addComponentOrReplace(new AudioSource(this.openSound));
      this.entity.getComponent(OnPointerDown).hoverText = ACTIONS.close;
    }

    this.entity.getComponent(AudioSource).playOnce();

    this.isOpen = !this.isOpen;
  }
}
