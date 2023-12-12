export class Validators {
  static validEmail(email: string): boolean {
    const emailRegEx = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return !!email.toLocaleLowerCase().trim().match(emailRegEx);
  }

  static required(value: string): boolean {
    return value.trim().length > 0;
  }

  static minLength(value: string, minLength: number): boolean {
    return value.trim().length >= minLength;
  }
}
